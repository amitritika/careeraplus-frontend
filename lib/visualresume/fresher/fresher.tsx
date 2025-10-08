import { IconType } from 'react-icons';
import {
  FaRunning,
  FaBaseballBall,
  FaTableTennis,
  FaFootballBall,
  FaChess,
  FaSwimmer,
  FaMusic,
  FaGuitar,
  FaShoePrints,
  FaPlane,
  FaHandsHelping,
  FaTheaterMasks,
  FaPaintBrush,
  FaBook,
  FaPen,
  FaGamepad,
  FaWifi,
  FaFilm,
  FaSeedling,
  FaPaw,
  FaTruck,
  FaCogs,
  FaCog,
  FaTint,
  FaThermometerHalf,
  FaFire,
  FaSnowflake,
  FaHammer,
  FaIndustry,
  FaBuilding,
  FaGlobeAmericas,
  FaCloud,
  FaWater,
  FaMap,
  FaMemory,
  FaChargingStation,
  FaMicroscope,
  FaLaptop,
  FaClock,
  FaMicrochip,
  FaSignal,
  FaSatellite,
  FaAtom,
  FaNetworkWired,
  FaTablets,
  FaCode,
  FaCodeBranch,
  FaLaptopCode,
  FaDatabase,
  FaFileInvoice,
  FaGavel,
  FaBriefcase,
  FaSearchDollar,
  FaUserTie,
  FaBullhorn,
  FaChartBar,
  FaCalculator,
  FaCloudUploadAlt,
  FaDollarSign
} from 'react-icons/fa';
import { FaWindows, FaChrome } from 'react-icons/fa';

// Type definitions
interface OptionItem {
  value: string;
  name: string;
}

interface AreaOfInterestTopics {
  [key: string]: OptionItem[];
}

interface AreaOfInterest {
  subject: OptionItem[];
  topics: AreaOfInterestTopics;
}

interface EducationItem {
  optional: boolean;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  toggle: boolean;
}

interface ProjectItem {
  title: string;
  desc: string;
  type?: string;
  org?: string;
  startDate?: string;
  endDate?: string;
  timestamp?: string;
  is_attachment?: boolean;
}

interface PersonalInformation {
  title: string;
  photoDisplay: boolean;
  phone: string;
  phone2: string;
  phone2Option: boolean;
  designation: string;
  address: string;
  addressFull: string;
  addressDisplay: boolean;
  aboutMe: string;
}

interface EducationalInformation {
  title: string;
  value: EducationItem[];
}

interface ProjectInformation {
  title: string;
  value: ProjectItem[];
}

interface LayoutSequence {
  left: string[];
  right: string[];
}

interface LayoutClasses {
  [key: string]: string;
}

interface LayoutDisplay {
  [key: string]: boolean;
}

interface Layout {
  sequence: string[];
  sequencelr: LayoutSequence;
  list: string[];
  listLR: LayoutSequence;
  display: LayoutDisplay;
  classes: LayoutClasses;
}


// Hobby icons mapping with react-icons
export const hobbiesList: Record<string, IconType> = {
  "Exercise": FaRunning,
  "Running": FaRunning,
  "Tennis": FaBaseballBall,
  "Table Tennis": FaTableTennis,
  "Cricket": FaBaseballBall,
  "Football": FaFootballBall,
  "Chess": FaChess,
  "Swimming": FaSwimmer,
  "Listening Music": FaMusic,
  "Playing Guitar": FaGuitar,
  "Playing Keyboard": FaMusic,
  "Playing Violin": FaMusic,
  "Playing Flute": FaMusic,
  "Singing": FaMusic,
  "Dancing": FaShoePrints,
  "Travelling": FaPlane,
  "Social Work": FaHandsHelping,
  "Drama": FaTheaterMasks,
  "Acting": FaTheaterMasks,
  "Painting": FaPaintBrush,
  "Reading": FaBook,
  "Writing": FaPen,
  "Gaming": FaGamepad,
  "Browsing": FaWifi,
  "Movies": FaFilm,
  "Gardening": FaSeedling,
  "Animal Care": FaPaw
} as const;

// Subject/Topic icons mapping with react-icons
export const topicIconsList: Record<string, IconType> = {
  "Engineering Mechanics": FaTruck,
  "Strength of Materials": FaCogs,
  "Theory Of machines": FaCogs,
  "Machine Design": FaCog,
  "Fluid Mechanics": FaTint,
  "Heat Tranfer": FaThermometerHalf,
  "Thermodynamics": FaFire,
  "Refrigeration & Air Cond": FaSnowflake,
  "Manufacturing Eng": FaHammer,
  "Industrial Eng": FaIndustry,
  "Solid Mechanics": FaTruck,
  "Structural Analysis": FaBuilding,
  "RCC Structures": FaBuilding,
  "Design of Steel Structures": FaBuilding,
  "Geotechnical Engineering": FaGlobeAmericas,
  "Fluid Mechanics & Machines": FaTint,
  "Environmental Engineering": FaCloud,
  "Irrigation Engineering": FaWater,
  "Engineering Hydrology": FaWater,
  "Transportation Engineering": FaTruck,
  "Geometics Engineering": FaGlobeAmericas,
  "CMM and Eng Mech": FaMap,
  "Network Theory": FaMemory,
  "Electromagnetics": FaChargingStation,
  "Control Systems": FaMicroscope,
  "Electronic Device & Circuits": FaLaptop,
  "Analog Circuits": FaClock,
  "Digital Circuits": FaMicrochip,
  "Microprocessors": FaMicrochip,
  "Signals & Systems": FaSignal,
  "Communication Systems": FaSatellite,
  "Electric Circuits": FaMemory,
  "Signal & Systems": FaSignal,
  "Electrical Machines": FaCogs,
  "Power Systems": FaChargingStation,
  "Measurement": FaMicroscope,
  "Digital Electronics": FaMicrochip,
  "Power Electronics": FaMicrochip,
  "Electromagnetic Theory": FaChargingStation,
  "Process Calculations": FaMap,
  "Mechanical Operations": FaThermometerHalf,
  "Heat Transfer": FaThermometerHalf,
  "Mass Transfer": FaAtom,
  "Chemical Reaction Eng": FaAtom,
  "Instrumentation": FaMicroscope,
  "Process Control": FaNetworkWired,
  "Plant Design & Economics": FaIndustry,
  "Chemical Technology": FaTablets,
  "Theory of Comput": FaLaptop,
  "Digital Logic": FaMemory,
  "Comp Org & Architecture": FaMemory,
  "Prog & Data Structures": FaCode,
  "Algorithms": FaCodeBranch,
  "Compiler Design": FaLaptopCode,
  "Operating Systems": FaWindows,
  "Databases": FaDatabase,
  "Computer Networks": FaNetworkWired,
  "Optical Instrumentation": FaMicroscope,
  "Artificial Intelligence": FaCodeBranch,
  "Computer Architecture": FaMemory,
  "Information Management": FaNetworkWired,
  "Web Systems": FaChrome,
  "Grid & Cloud Comput": FaCloudUploadAlt,
  "Accounting": FaFileInvoice,
  "Economics": FaDollarSign,
  "Business & Corporate Law": FaGavel,
  "Business Management": FaBriefcase,
  "Auditing": FaSearchDollar,
  "Environmental Studies": FaGlobeAmericas,
  "Entrepreneurship": FaUserTie,
  "Taxation": FaDollarSign,
  "Marketing": FaBullhorn,
  "Statistics": FaChartBar,
  "Mathematics": FaCalculator,
  "Programming": FaCode,
  "Computer Application": FaLaptopCode,
  "Web Development": FaChrome,
  "Data Base Management": FaDatabase,
  "Ananalog Electronics": FaClock,
  "Signal & System": FaSignal,
  "Communication Sys": FaSatellite,
  "Contorl System": FaMicroscope
} as const;

// Area of Interest data structure
export const areaOfInterest: AreaOfInterest = {
  subject: [
    { value: "ME", name: "Mechanical Engineering" },
    { value: "CE", name: "Civil Engineering" },
    { value: "ECE", name: "Electronics & Communication Engineering" },
    { value: "CSE", name: "Computer Science Engineering" },
    { value: "EE", name: "Electrical Engineering" },
    { value: "CHE", name: "Chemical Engineering" },
    { value: "IE", name: "Instrumentation Engineering" },
    { value: "IT", name: "Information Technology" },
    { value: "BCOM", name: "Bachelor of Commerce" }
  ],
  topics: {
    ME: [
      { value: "Engineering Mechanics", name: "Engineering Mechanics" },
      { value: "Strength of Materials", name: "Strength of Materials" },
      { value: "Theory Of machines", name: "Theory Of machines" },
      { value: "Machine Design", name: "Machine Design" },
      { value: "Fluid Mechanics", name: "Fluid Mechanics" },
      { value: "Heat Tranfer", name: "Heat Tranfer" },
      { value: "Thermodynamics", name: "Thermodynamics" },
      { value: "Refrigeration & Air Cond", name: "Refrigeration & Air Cond" },
      { value: "Manufacturing Eng", name: "Manufacturing Eng" },
      { value: "Industrial Eng", name: "Industrial Eng" }
    ],
    CE: [
      { value: "Solid Mechanics", name: "Solid Mechanics" },
      { value: "Structural Analysis", name: "Structural Analysis" },
      { value: "RCC Structures", name: "RCC Structures" },
      { value: "Design of Steel Structures", name: "Design of Steel Structures" },
      { value: "Geotechnical Engineering", name: "Geotechnical Engineering" },
      { value: "Fluid Mechanics & Machines", name: "Fluid Mechanics & Machines" },
      { value: "Environmental Engineering", name: "Environmental Engineering" },
      { value: "Irrigation Engineering", name: "Irrigation Engineering" },
      { value: "Engineering Hydrology", name: "Engineering Hydrology" },
      { value: "Transportation Engineering", name: "Transportation Engineering" },
      { value: "Geometics Engineering", name: "Geometics Engineering" },
      { value: "CMM and Eng Mech", name: "CMM and Eng Mech" }
    ],
    ECE: [
      { value: "Network Theory", name: "Network Theory" },
      { value: "Electromagnetics", name: "Electromagnetics" },
      { value: "Control Systems", name: "Control Systems" },
      { value: "Electronic Device & Circuits", name: "Electronic Device & Circuits" },
      { value: "Analog Circuits", name: "Analog Circuits" },
      { value: "Digital Circuits", name: "Digital Circuits" },
      { value: "Microprocessors", name: "Microprocessors" },
      { value: "Signals & Systems", name: "Signals & Systems" },
      { value: "Communication Systems", name: "Communication Systems" }
    ],
    CSE: [
      { value: "Theory of Comput", name: "Theory of Comput" },
      { value: "Digital Logic", name: "Digital Logic" },
      { value: "Comp Org & Architecture", name: "Comp Org & Architecture" },
      { value: "Prog & Data Structures", name: "Prog & Data Structures" },
      { value: "Algorithms", name: "Algorithms" },
      { value: "Compiler Design", name: "Compiler Design" },
      { value: "Operating Systems", name: "Operating Systems" },
      { value: "Databases", name: "Databases" },
      { value: "Computer Networks", name: "Computer Networks" }
    ],
    EE: [
      { value: "Electric Circuits", name: "Electric Circuits" },
      { value: "Signal & Systems", name: "Signal & Systems" },
      { value: "Electrical Machines", name: "Electrical Machines" },
      { value: "Power Systems", name: "Power Systems" },
      { value: "Control Systems", name: "Control Systems" },
      { value: "Measurement", name: "Measurement" },
      { value: "Analog Circuits", name: "Analog Circuits" },
      { value: "Digital Electronics", name: "Digital Electronics" },
      { value: "Power Electronics", name: "Power Electronics" },
      { value: "Electromagnetic Theory", name: "Electromagnetic Theory" }
    ],
    CHE: [
      { value: "Process Calculations", name: "Process Calculations" },
      { value: "Thermodynamics", name: "Thermodynamics" },
      { value: "Fluid Mechanics", name: "Fluid Mechanics" },
      { value: "Mechanical Operations", name: "Mechanical Operations" },
      { value: "Heat Transfer", name: "Heat Transfer" },
      { value: "Mass Transfer", name: "Mass Transfer" },
      { value: "Chemical Reaction Eng", name: "Chemical Reaction Eng" },
      { value: "Instrumentation", name: "Instrumentation" },
      { value: "Process Control", name: "Process Control" },
      { value: "Plant Design & Economics", name: "Plant Design & Economics" },
      { value: "Chemical Technology", name: "Chemical Technology" }
    ],
    IE: [
      { value: "Network Theory", name: "Network Theory" },
      { value: "Instrumentation", name: "Instrumentation" },
      { value: "Ananalog Electronics", name: "Ananalog Electronics" },
      { value: "Signal & System", name: "Signal & System" },
      { value: "Communication Sys", name: "Communication Sys" },
      { value: "Contorl System", name: "Contorl System" },
      { value: "Process Control", name: "Process Control" },
      { value: "Digital Electronics", name: "Digital Electronics" },
      { value: "Measurement", name: "Measurement" },
      { value: "Optical Instrumentation", name: "Optical Instrumentation" }
    ],
    IT: [
      { value: "Artificial Intelligence", name: "Artificial Intelligence" },
      { value: "Computer Architecture", name: "Computer Architecture" },
      { value: "Prog & Data Structures", name: "Prog & Data Structures" },
      { value: "Algorithms", name: "Algorithms" },
      { value: "Compiler Design", name: "Compiler Design" },
      { value: "Operating Systems", name: "Operating Systems" },
      { value: "Databases", name: "Databases" },
      { value: "Computer Networks", name: "Computer Networks" },
      { value: "Information Management", name: "Information Management" },
      { value: "Web Systems", name: "Web Systems" },
      { value: "Grid & Cloud Comput", name: "Grid & Cloud Comput" }
    ],
    BCOM: [
      { value: "Accounting", name: "Accounting" },
      { value: "Economics", name: "Economics" },
      { value: "Business & Corporate Law", name: "Business & Corporate Law" },
      { value: "Business Management", name: "Business Management" },
      { value: "Auditing", name: "Auditing" },
      { value: "Environmental Studies", name: "Environmental Studies" },
      { value: "Entrepreneurship", name: "Entrepreneurship" },
      { value: "Taxation", name: "Taxation" },
      { value: "Marketing", name: "Marketing" },
      { value: "Statistics", name: "Statistics" },
      { value: "Mathematics", name: "Mathematics" },
      { value: "Programming", name: "Programming" },
      { value: "Computer Application", name: "Computer Application" },
      { value: "Web Development", name: "Web Development" },
      { value: "Data Base Management", name: "Data Base Management" }
    ]
  }
};

// @/lib/visualresume/fresher/fresher.ts

import { VisualResumeData } from '@/types/visualresume/fresher';

export const visualresumedata: VisualResumeData = {
  layout: {
    sequence: [
      "userInfo",
      "personalInfo", 
      "profileSummaryInfo",
      "educationInfo",
      "projectsInfo",
      "workexpInfo",
      "techSkillsInfo",
      "areaOfIntrestInfo",
      "achievmentsInfo",
      "hobbiesInfo"
    ],
    sequencelr: {
      left: [
        "userInfo",
        "personalInfo",
        "profileSummaryInfo", 
        "techSkillsInfo",
        "hobbiesInfo"
      ],
      right: [
        "educationInfo",
        "projectsInfo",
        "workexpInfo", 
        "areaOfIntrestInfo",
        "achievmentsInfo"
      ]
    },
    list: [
      "userInfoDisplay",
      "personalInfoDisplay",
      "profileSummaryInfoDisplay",
      "educationInfoDisplay",
      "projectsInfoDisplay",
      "workexpInfoDisplay",
      "techSkillsInfoDisplay", 
      "areaOfIntrestInfoDisplay",
      "achievmentsInfoDisplay",
      "hobbiesInfoDisplay"
    ],
    listLR: {
      left: [
        "userInfoDisplay",
        "personalInfoDisplay",
        "profileSummaryInfoDisplay",
        "techSkillsInfoDisplay",
        "hobbiesInfoDisplay"
      ],
      right: [
        "educationInfoDisplay",
        "projectsInfoDisplay",
        "workexpInfoDisplay",
        "areaOfIntrestInfoDisplay", 
        "achievmentsInfoDisplay"
      ]
    },
    display: {
      userInfo: true,
      personalInfo: true,
      profileSummaryInfo: true,
      educationInfo: true,
      projectsInfo: true,
      workexpInfo: true,
      techSkillsInfo: true,
      areaOfIntrestInfo: true,
      achievmentsInfo: true,
      hobbiesInfo: true
    },
    classes: {
      userInfoClass: "btn btn-sm btn-success w-75 mt-2",
      personalInfoClass: "btn btn-sm btn-success w-75 mt-2",
      profileSummaryInfoClass: "btn btn-sm btn-success w-75 mt-2",
      educationInfoClass: "btn btn-sm btn-success w-75 mt-2",
      projectsInfoClass: "btn btn-sm btn-success w-75 mt-2",
      workexpInfoClass: "btn btn-sm btn-success w-75 mt-2",
      techSkillsInfoClass: "btn btn-sm btn-success w-75 mt-2",
      areaOfIntrestInfoClass: "btn btn-sm btn-success w-75 mt-2",
      achievmentsInfoClass: "btn btn-sm btn-success w-75 mt-2",
      hobbiesInfoClass: "btn btn-sm btn-success w-75 mt-2"
    }
  },
  personalInformation: {
    phone: "9xxxxxxxx9",
		phone2:  {optional: false, value: "8xxxxxxxx8"},
    designation: "Mxxxxxxxl Exxxxxxr",
    address: "BHOPAL, INDIA",
		addressFull: {optional: false, value: "MIG-15, Anandvihar Colony, Arera Border, Bhopal, MP, INDIA, 461003"},
    visa: {optional: true, value: "USA B1/B2"},
		photoDisplay:true,
    aboutMe: "A highly motivated and enthusiastic Mechanical Engineer with a strong foundation in engineering principles and a passion for continuous learning. Adept at problem-solving and eager to contribute to innovative projects in a dynamic work environment."
  },
  educationalInformation: {
    title: "EDUCATION",
    value: [
      {
        optional: true,
        degree: "B.tech",
        college: "NIT Bhopal", 
        year: "2009",
        cgpa: "7.8 CGPA",
        toggle: true
      },
      {
        optional: true,
        degree: "HSC",
        college: "MP Board",
        year: "2005", 
        cgpa: "88%",
        toggle: true
      },
      {
        optional: true,
        degree: "SSC 10th",
        college: "MP Board",
        year: "2003",
        cgpa: "78%",
        toggle: true
      }
    ]
  },
  projectInformation: {
    title: "PROJECTS",
    value: [
      {
        title: "TREADMIL BICYCLE",
        desc: "<p>Treadmill bicycle is a unique way of moving. In this project we made a prototype of a bicycle which gets the power not with pedal wheel but with the movement of treadmill belt when you walk on it.</p>"
      },
      {
        title: "Gear CAD Design", 
        desc: "<p>Designed Gear Design in Pro-E, uing a parametric Model. <br> By using only two parameters, Module and No. of theeths a CAD model will be generated automatically.</p>"
      }
    ]
  },
  trainingInformation: {
    title: "INDUSTRIAL EXPOSURE",
    value: [
      {
        type: "Industrial Training",
        org: "EICHER TRACTORS",
        startDate: "01/05/2015",
        endDate: "01/06/2015", 
        desc: "<p>Unit of TAFE Motors and Tractor Ltd. Projects Handled: <p> 1. Rapid Entire Body Assessment (REBA) </p> <p>2. Hazard Identification and Risk Analysis (HIRA)</p>"
      },
      {
        type: "Industrial Training",
        org: "BHEL Bhopal",
        startDate: "01/07/2016",
        endDate: "01/07/2016",
        desc: "<p>Unit of Turbine Manufacturing.<br>Gained Knowledge on Manufacturing and Design process of Gas Turbine.</p>"
      }
    ]
  },
  skills: {
    title: "SKILLS",
    value: [
      { value: "Pro-E", rating: "4" },
      { value: "AUTOCAD", rating: "4" },
      { value: "MS Office", rating: "3" },
      { value: "Good and Efficient learner", rating: "5" },
      { value: "Positive Attitude", rating: "5" }
    ],
    skill1: "Pro-E",
    rating1: "4",
    skill2: "AUTOCAD", 
    rating2: "4",
    skill3: "MS Office",
    rating3: "3",
    skill4: "Good and Efficient learner",
    rating4: "5",
    skill5: "Positive Attitude",
    rating5: "5",
    skill6: "Skill 6",
    rating6: "4",
    skill6Display: false,
    skill7: "Skill 7", 
    rating7: "5",
    skill7Display: false
  },
  hobbies: {
    title: "HOBBIES",
    value: ["Tennis", "Running", "Playing Guitar"],
    hobby1: "Tennis",
    hobby2: "Running",
    hobby3: "Playing Guitar"
  },
  areaOfIntrest: {
    title: "AREA OF INTRESTS",
    area: "eng",
    area1: "ME",
    area1Topic: "Strength of Materials",
    area2: "ME", 
    area2Topic: "Fluid Mechanics",
    area3: "ME",
    area3Topic: "Heat Tranfer", 
    show: false
  },
  extraCurricular: {
    title: "EXTRA CURRICULAR",
    value: [
      "Qualified GATE 2018",
      "Won 3rd Prize in Debate Competition in College", 
      "Active member of KD Food for Life a Non-profit Social organization"
    ],
    extra1: "Qualified GATE 2018",
    extra2: "Won 3rd Prize in Debate Competition in College",
    extra3: "Active member of KD Food for Life a Non-profit Social organization",
    extra4: "",
    extra5: "",
    extra4Display: false,
    extra5Display: false
  },
  payment: {
    status: false,
    date: new Date()
  },
  colors: {
                "bg": "rgb(1, 51, 66)",
                "font": "rgb(75, 172, 198)"
            }
};
