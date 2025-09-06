'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { apiFetch, API_BASE } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';
import AuthProtected from '@/components/templates/AuthProtected';
import Button from '@/components/atoms/Button';

type Profile = {
  username: string;
  name: string;
  email: string;
  about?: string;
  photo?: {
    contentType?: string;
    data?: string;
  };
};

export default function AccountPage() {
  return (
    <AuthProtected>
      {(user) => <AccountPageContent user={user} />}
    </AuthProtected>
  );
}

function AccountPageContent({ user }: { user: Profile }) {
  const router = useRouter();

  // form state
  // Form state - initialize with user data from AuthProtected
    const [name, setName] = React.useState(user?.name ?? '');
    const [username, setUsername] = React.useState(user?.username ?? '');
    const [about, setAbout] = React.useState(user?.about ?? '');
    const [loading, setLoading] = React.useState(false); // Changed to false since we have user data
    const { show } = useToast();

  // photo state
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoStamp, setPhotoStamp] = React.useState(() => Date.now());

  // crop state
  const [showCropModal, setShowCropModal] = React.useState(false);
  const [tempImageSrc, setTempImageSrc] = React.useState<string>('');
  const [crop, setCrop] = React.useState<Crop>();
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();
  const imgRef = React.useRef<HTMLImageElement>(null);

  // forgot-password UI
  const [fpBusy, setFpBusy] = React.useState(false);

  React.useEffect(() => {
      if (user) {
        setName(user.name ?? '');
        setUsername(user.username ?? '');
        setAbout(user.about ?? '');
      }
    }, [user]);

  // Handle file selection - now opens crop modal
  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    
    const url = URL.createObjectURL(f);
    setTempImageSrc(url);
    setShowCropModal(true);
  }

  // Initialize crop when image loads
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    
    // Create a 1:1 aspect ratio crop centered in the image
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 50, // Start with 50% of image width
        },
        1, // 1:1 aspect ratio
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(crop);
  }

  // Convert crop area to canvas and then to File
  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): Promise<File> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // Set canvas size to crop size
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Draw cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        const file = new File([blob], 'cropped-image.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(file);
      }, 'image/jpeg', 0.95);
    });
  }

  // Handle crop confirmation
  async function onCropConfirm() {
    if (!imgRef.current || !completedCrop) {
      show({ type: 'error', title: 'Please select a crop area' });
      return;
    }

    try {
      const croppedFile = await getCroppedImg(imgRef.current, completedCrop);
      const previewUrl = URL.createObjectURL(croppedFile);
      
      setPhotoFile(croppedFile);
      setPhotoPreview(previewUrl);
      setShowCropModal(false);
      
      // Clean up temp URL
      URL.revokeObjectURL(tempImageSrc);
      setTempImageSrc('');
    } catch (error) {
      console.error('Error cropping image:', error);
      show({ type: 'error', title: 'Failed to crop image' });
    }
  }

  // Handle crop cancellation
  function onCropCancel() {
    setShowCropModal(false);
    URL.revokeObjectURL(tempImageSrc);
    setTempImageSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
  }

  function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const fd = new FormData();
      // The /api/user/update endpoint accepts normal fields + optional `photosrc`
      fd.set('name', name);
      fd.set('username', username);
      fd.set('about', about);
      
      if (photoFile) {
        fd.set('photosrc', photoFile);
        const dataUri = await fileToDataURL(photoFile);
        console.log('Updating profile with', dataUri);
      }

      const updated = await apiFetch('/api/user/update', {
        method: 'PUT',
        body: fd, // don't set Content-Type; the browser sets boundary
      });

      
      // clear preview if saved
      setPhotoFile(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      
      // bump the version to force a fresh fetch with enhanced cache busting
      setPhotoStamp(Date.now());
      setTimeout(() => setPhotoStamp(Date.now()), 1000);

      show({ type: 'success', title: 'Profile updated' });
    } catch (e: any) {
      show({ type: 'error', title: 'Update failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  async function onSendResetLink() {
    if (!user?.email) return;
    try {
      setFpBusy(true);
      const res = await apiFetch<{ message: string; token?: string }>(
        '/api/auth/forgot-password',
        { method: 'PUT', json: { email: user.email } }
      );
      show({ type: 'success', title: res.message || 'If the email exists, a reset link has been sent.' });
      // Dev convenience: if token present, point to /reset/:token
      if (res.token && process.env.NODE_ENV !== 'production') {
        show({ type: 'info', title: 'Dev reset link', description: `${window.location.origin}/reset/${res.token}` });
      }
    } catch (e: any) {
      show({ type: 'error', title: 'Could not send reset link', description: e.message });
    } finally {
      setFpBusy(false);
    }
  }

  // Fixed to use the correct photo endpoint that works with your backend
  const photoSrc = photoPreview || 
    (user?.username 
      ? `${API_BASE}/api/user/photo/${user.username}?v=${photoStamp}&t=${Date.now()}`
      : undefined);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Account</h1>
      <p className="text-gray-600 mb-6">Update your basic details and profile picture.</p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Photo */}
          <div>
            <div className="mb-4">
              {photoSrc ? (
                <Image
                  key={`profile-photo-${photoStamp}`}
                  src={photoSrc}
                  alt="Profile"
                  width={100}
                  height={100}
                  unoptimized={true}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', photoSrc);
                  }}
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  No photo
                </div>
              )}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">Profile photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onPickPhoto}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {photoPreview && (
              <button
                type="button"
                onClick={() => {
                  setPhotoFile(null);
                  if (photoPreview) URL.revokeObjectURL(photoPreview);
                  setPhotoPreview(null);
                }}
                className="text-sm text-gray-600 underline mt-2"
              >
                Remove selected photo
              </button>
            )}
          </div>

          {/* Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.currentTarget.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              className="font-semibold w-max"
            >
              {loading ? 'Saving…' : 'Update profile'}
            </Button>

            <button
              type="button"
              onClick={onSendResetLink}
              disabled={fpBusy}
              className="text-[color:rgb(var(--primary-600))] hover:text-[color:rgb(var(--primary-500))] font-semibold transition-colors duration-200 w-max"
            >
              {fpBusy ? 'Sending…' : 'Send password reset link'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline w-max"
            >
              Go back
            </button>
          </div>
        </form>
      )}

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Crop Your Photo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Adjust the crop area to create a perfect square (1:1) profile photo
              </p>
              
              <div className="mb-4 flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1} // 1:1 aspect ratio
                  minHeight={100}
                  minWidth={100}
                >
                  <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={tempImageSrc}
                    style={{ maxHeight: '400px', maxWidth: '100%' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={onCropCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={onCropConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={!completedCrop}
                >
                  Confirm Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
