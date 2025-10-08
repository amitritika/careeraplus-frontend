
'use client';
import React from 'react';
import BlockBullet from '@/components/molecules/visualresume/BlockBullet';
import BlockBulletUnified from '@/components/molecules/visualresume/BlockBulletUnified';
import { BlockBulletProps, BulletItemProps } from '@/components/molecules/visualresume/BlockBullet/BlockBullet';

const bulletData: BulletItemProps = {
    name: "<strong>TypeScript Development</strong> experience",
    height: 25,
    top: 0,
    line: 0.8
};

const ExampleUsage: React.FC = () => {
    return (
        <div className="m-10">
            <div className="mb-10">
                
                <div className="mb-10 absolute" style = {{top: "100px", left: "50px"}}>
    
                    <BlockBullet 
                        resumeType="fresher" 
                        template={1}
                        fac={5}
                        props={bulletData}
                        bg="#0066cc"
                        font = "#383634ff"
                        fontFamily="Arial"
                        id="bullet-example"
                    />
                </div>
            </div>

            <div className="mb-10">
                
                
                <div className="mb-10 absolute" style = {{top: "200px", left: "50px"}}>
                    
                    <BlockBullet 
                        resumeType="fresher" 
                        template={2}
                        fac={5}
                        props={bulletData}
                        bg="#0066cc"
                        font = "#383634ff"
                        fontFamily="Arial"
                        id="bullet-example"
                    />
                </div>
            </div>

            <div className="mb-10">
                
                <div className="mb-10 absolute" style = {{top: "300px", left: "50px"}}>
                
                    <BlockBullet 
                        resumeType="fresher" 
                        template={3}
                        fac={5}
                        props={bulletData}
                        bg="#0066cc"
                        font = "#383634ff"
                        fontFamily="Arial"
                        id="bullet-example"
                    />
                </div>
            </div>

            <div className="mb-10">
                
                <div className="mb-10 absolute" style = {{top: "400px", left: "50px"}}>
                
                    <BlockBullet 
                        resumeType="fresher" 
                        template={4}
                        fac={5}
                        props={bulletData}
                        bg="#0066cc"
                        font = "#383634ff"
                        fontFamily="Arial"
                        id="bullet-example"
                    />
                </div>
            </div>

            <div className="mb-10">
                
                <div className="mb-10 absolute" style = {{top: "500px", left: "50px"}}>
                
                    <BlockBullet 
                        resumeType="fresher" 
                        template={5}
                        fac={5}
                        props={bulletData}
                        bg="#0066cc"
                        font = "#383634ff"
                        fontFamily="Arial"
                        id="bullet-example"
                    />
                </div>
            </div>
            
        </div>

       
    );
};

export default ExampleUsage;