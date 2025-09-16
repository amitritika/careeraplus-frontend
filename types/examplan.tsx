// types/examplan.ts
export interface Exam {
  _id: string;
  name: string;
  slug: string;
  description: string;
  streams: Stream[];
  isActive: boolean;
}

export interface Stream {
  name: string;
  slug: string;
  preparationTypes: PreparationType[];
  isActive: boolean;
}

export interface PreparationType {
  name: string;
  slug: string;
  description: string;
  subjects: Subject[];
  isActive: boolean;
}

export interface Subject {
  name: string;
  weight: number;
  topics: Topic[];
}

export interface Topic {
  name: string;
  weight: number;
}

export interface ExamPlanRequest {
  startDate: string;
  endDate: string;
  hasVacation: boolean;
  hasRevision: boolean;
  vacationStart?: string;
  vacationEnd?: string;
}

export interface ExamPlanResponse {
  success: boolean;
  data: {
    exam: string;
    stream: string;
    preparationType: string;
    totalDays: number;
    studyDays: number;
    vacationDays: number;
    schedule: ScheduleDay[];
    subjects: SubjectPlan[];
    phases: {
      z1: number;
      z2: number;
      z3: number;
    };
    statistics: {
      mainCourseDays: number;
      finalRevision1Days: number;
      finalRevision2Days: number;
      backupDays: number;
      scheduleBreakdown: {
        totalDays: number;
        studyDays: number;
        revision1Days: number;
        revision2Days: number;
        vacationDays: number;
        backupDays: number;
        testDays: number;
        topicTests: number;
        fullLengthRev1Tests: number;
        fullLengthRev2Tests: number;
      };
      subjectStats: {
        name: string;
        studyDays: number;
        revision1Days: number;
        revision2Days: number;
        totalDays: number;
        topicCount: number;
        expectedTopicTests: number;
      }[];
    };
  };
}

export interface ScheduleDay {
  date: string;
  subject: string;
  topic: string;
  type: 'study' | 'Rev1' | 'Rev2' | 'vacation' | 'backup' | 'test';
  testType?: 'topic' | 'full_length_rev1' | 'full_length_rev2';
  color: string;
  isLastDay?: boolean;
}

export interface SubjectPlan {
  name: string;
  studyDays: number;
  revision1Days: number;
  revision2Days: number;
  totalDays: number;
  color: string;
  topics: {
    name: string;
    days: number;
    weight: number;
  }[];
}
