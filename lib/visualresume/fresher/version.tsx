export const version1 = (data: any) => {
  data.layout = {
    sequence: ["userInfo",
    "personalInfo",
    "profileSummaryInfo",
    "educationInfo",
    "projectsInfo",
		"workexpInfo",
    "techSkillsInfo",
		"areaOfIntrestInfo",
    "achievmentsInfo",
    "hobbiesInfo"],
    sequencelr: {
    left: ["userInfo",
    "personalInfo",
    "profileSummaryInfo",
    "techSkillsInfo",
    "hobbiesInfo"],
    
    right: [
    "educationInfo",
		"projectsInfo",
    "workexpInfo",
		"areaOfIntrestInfo",
    "achievmentsInfo"
    ]
                     },
    list: ["userInfoDisplay", 
					 "personalInfoDisplay", 
					 "profileSummaryInfoDisplay", 
					 "educationInfoDisplay", 
					 "projectsInfoDisplay",
					 "workexpInfoDisplay", 
					 "techSkillsInfoDisplay", 
					 "areaOfIntrestInfoDisplay", 
					 "achievmentsInfoDisplay", 
					 "hobbiesInfoDisplay"],
    listLR: {
      left: ["userInfoDisplay", "personalInfoDisplay", "profileSummaryInfoDisplay", "techSkillsInfoDisplay", "hobbiesInfoDisplay"],
      right: ["educationInfoDisplay","projectsInfoDisplay", "workexpInfoDisplay", "areaOfIntrestInfoDisplay", "achievmentsInfoDisplay"]
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
  };
  data.payment =  {
		status: false,
		date: new Date()
	};
  data.pesrsonalInformation.photoDisplay = true;
	data.pesrsonalInformation.phone2 = "8xxxxxxxx8";
	data.pesrsonalInformation.phone2Display = false;
  data.pesrsonalInformation.title = "ABOUT ME";
  data.pesrsonalInformation.addressFull = "MIG-15, Anandvihar Colony, Arera Border, Bhopal, MP, INDIA, 461003";
  data.pesrsonalInformation.addressDisplay = false;
  let edu = data.educationalInformation
  data.educationalInformation.title = "EDUCATION";
  data.educationalInformation.value = [
    {
      optional: true,
      degree: edu.latestDegree,
      college: edu.latestCollege,
      year: edu.latestYear,
      cgpa: edu.latestCgpa,
      toggle: true
    },
    {
      optional: true,
      degree: edu.nextDegree,
      college: edu.nextCollege,
      year: edu.nextYear,
      cgpa: edu.nextCgpa,
      toggle: true
    },
    {
      optional: true,
      degree: edu.lastDegree,
      college: edu.lastCollege,
      year: edu.lastYear,
      cgpa: edu.lastCgpa,
      toggle: true
    },
  ];
  
  data.projectInformation.title = "PROJECTS";
  let proj = data.projectInformation;
  data.projectInformation.value = [
    {
      title: proj.majTitle,
      desc: proj.majDes
    },
    {
      title: proj.minTitle,
      desc: proj.minDes
    }
  ];
  data.projectInformation.projectDisplay = true;
  data.trainingInformation.title = "INDUSTRIAL EXPOSURE";
  let train = data.trainingInformation;
  if(train.trainingDisplay){
    data.trainingInformation.value = [
      {
        type: train.training1,
        org: train.org1,
        startDate: train.startDate1,
        endDate: train.endDate1,
        desc: train.des1
      },
      {
        type: train.training2,
        org: train.org2,
        startDate: train.startDate2,
        endDate: train.endDate2,
        desc: train.des2
      }
    ]
  }else{
    data.trainingInformation.value = [
      {
        type: train.training1,
        org: train.org1,
        startDate: train.startDate1,
        endDate: train.endDate1,
        desc: train.des1
      }
    ]
  }
  data.skills.title = "SKILLS";
  let skill = data.skills;
  data.skills.value = [
    {
      value: skill.skill1,
      rating: skill.rating1
    },
    {
      value: skill.skill2,
      rating: skill.rating2
    },
    {
      value: skill.skill3,
      rating: skill.rating3
    },
    {
      value: skill.skill4,
      rating: skill.rating4
    },
    {
      value: skill.skill5,
      rating: skill.rating5
    }
  ];
  if(skill.skill7Display){
    data.skills.value.push({
      value: skill.skill6,
      rating: skill.rating6
    })
    data.skills.value.push({
      value: skill.skill7,
      rating: skill.rating7
    })
  }else{
    if(skill.skill6Display){
        data.skills.value.push({
        value: skill.skill6,
        rating: skill.rating6
      })
    }
  }
  data.hobbies.title = "HOBBIES";
	let hobby = data.hobbies;
	data.hobbies.value = [hobby.hobby1, hobby.hobby2, hobby.hobby3]
  data.areaOfIntrest.title = "AREA OF INTRESTS";
  data.extraCurricular.title = "EXTRA CURRICULAR";
  let extra = data.extraCurricular
  data.extraCurricular.value = [
    extra.extra1,
    extra.extra2,
    extra.extra3
  ]
  if(extra.extra5Display){
    data.extraCurricular.value.push(extra.extra4)
    data.extraCurricular.value.push(extra.extra5)
  }else{
    if(extra.extra4Display){
      data.extraCurricular.value.push(extra.extra4)
    }
  }
  
  return data;
}