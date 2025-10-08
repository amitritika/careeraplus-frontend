// @/types/visualresume/fresher.ts

export interface Layout {
  sequence: string[];
  sequencelr: {
    left: string[];
    right: string[];
  };
  list: string[];
  listLR: {
    left: string[];
    right: string[];
  };
  display: {
    userInfo: boolean;
    personalInfo: boolean;
    profileSummaryInfo: boolean;
    educationInfo: boolean;
    projectsInfo: boolean;
    workexpInfo: boolean;
    techSkillsInfo: boolean;
    areaOfIntrestInfo: boolean;
    achievmentsInfo: boolean;
    hobbiesInfo: boolean;
  };
  classes: {
    userInfoClass: string;
    personalInfoClass: string;
    profileSummaryInfoClass: string;
    educationInfoClass: string;
    projectsInfoClass: string;
    workexpInfoClass: string;
    techSkillsInfoClass: string;
    areaOfIntrestInfoClass: string;
    achievmentsInfoClass: string;
    hobbiesInfoClass: string;
  };
}

export interface PersonalInformation {
  photoDisplay: boolean;
  phone: string;
  phone2: { optional: boolean; value: string};
  designation: string;
  address: string;
  addressFull: { optional: boolean; value: string};
  visa: { optional: boolean; value: string};
  // addressDisplay: boolean;
  aboutMe: string;
}

export interface Education {
  optional: boolean;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  toggle: boolean;
}

export interface EducationalInformation {
  title: string;
  value: Education[];
}

export interface Project {
  title: string;
  desc: string;
}

export interface ProjectInformation {
  title: string;
  value: Project[];
}

export interface Training {
  type: string;
  org: string;
  startDate: string;
  endDate: string;
  desc: string;
}

export interface TrainingInformation {
  title: string;
  value: Training[];
}

export interface Skill {
  value: string;
  rating: string;
}

export interface Skills {
  title: string;
  value: Skill[];
  skill1: string;
  rating1: string;
  skill2: string;
  rating2: string;
  skill3: string;
  rating3: string;
  skill4: string;
  rating4: string;
  skill5: string;
  rating5: string;
  skill6: string;
  rating6: string;
  skill6Display: boolean;
  skill7: string;
  rating7: string;
  skill7Display: boolean;
}

export interface Hobbies {
  title: string;
  value: string[];
  hobby1: string;
  hobby2: string;
  hobby3: string;
}

export interface AreaOfIntrest {
  title: string;
  area: string;
  area1: string;
  area1Topic: string;
  area2: string;
  area2Topic: string;
  area3: string;
  area3Topic: string;
  show: boolean;
}

export interface ExtraCurricular {
  title: string;
  value: string[];
  extra1: string;
  extra2: string;
  extra3: string;
  extra4: string;
  extra5: string;
  extra4Display: boolean;
  extra5Display: boolean;
}

export interface Payment {
  status: boolean;
  date: Date;
}

export interface VisualResumeData {
  layout: Layout;
  personalInformation: PersonalInformation; // Preserving the typo as in original data
  educationalInformation: EducationalInformation;
  projectInformation: ProjectInformation;
  trainingInformation: TrainingInformation;
  skills: Skills;
  hobbies: Hobbies;
  areaOfIntrest: AreaOfIntrest; // Preserving the typo as in original data
  extraCurricular: ExtraCurricular;
  payment: Payment;
  trainingsInformation?: TrainingInformation
  colors: { bg: string; font: string}
}

export interface Profile {
  username: string;
  name: string;
  email: string;
  role?: number;
  photoUrl?: string;
}

export interface UserInformationProps {
  profile: Profile;
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}
