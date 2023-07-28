import { prisma } from "@/lib/prisma";
import { RouteExceptionError } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const GET: CrudRequestHandler = async (request, url) => {
  const getStudent = await prisma.student.findFirst({
    where: {
      id: parseInt(url.params.id),
    },
    select: {
      year: {
        select: {
          year: true,
        },
      },
      registrationNumber: true,
      createdAt: true,
      email: true,
      phoneNumber: true,
      firstName: true,
      lastName: true,
      nickName: true,
      major: {
        select: {
          id: true,
          name: true,
        },
      },
      relapsingIllness: true,
      seriousIllness: true,
      NISNNumber: true,
      KIPKPSNumber: true,
      examNumber: true,
      ijazahNumber: true,
      SKHUNNumber: true,
      parentPhoneNumber: true,
      birthplace: true,
      birthdate: true,
      religion: true,
      nationality: true,
      birthPosition: true,
      siblingCount: true,
      stepSiblingCount: true,
      fosterSiblingCount: true,
      familyStatus: true,
      motherLanguage: true,
      livingWith: true,
      schoolDistance: true,
      address: true,
      gender: true,
      weight: true,
      height: true,
      bloodType: true,
      bloodRhesus: true,
      formerSchool: {
        select: {
          id: true,
          type: true,
          name: true,
        },
      },
      schoolGraduateYear: true,
      fatherFullname: true,
      fatherBirthdate: true,
      fatherNationality: true,
      fatherLastEducation: true,
      fatherAddress: true,
      fatherIncome: true,
      fatherJob: true,
      motherFullname: true,
      motherBirthdate: true,
      motherNationality: true,
      motherLastEducation: true,
      motherAddress: true,
      motherIncome: true,
      motherJob: true,
      bioEdited: true,
      fileEdited: true,
      historyEdited: true,
      measureEdited: true,
    },
  });

  if (!getStudent) throw new RouteExceptionError("Student not found", 404);

  return NextResponse.json({
    PPDBYear: getStudent.year?.year,
    registerNumber: getStudent.registrationNumber,
    registerDate: getStudent.createdAt,
    email: getStudent.email,
    phone: getStudent.phoneNumber,
    name: {
      firstName: getStudent.firstName,
      lastName: getStudent.lastName,
      fullName: getStudent.firstName + " " + getStudent.lastName,
      nickname: getStudent.nickName,
      initial:
        getStudent.firstName?.charAt(0) + " " + getStudent.lastName?.charAt(0),
    },
    selectedMajor: {
      id: getStudent.major?.id,
      name: getStudent.major?.name,
    },
    disease: {
      relapsingDisease: getStudent.relapsingIllness,
      seriousDisease: getStudent.seriousIllness,
    },
    numbers: {
      NISN: getStudent.NISNNumber,
      KIPKPS: getStudent.KIPKPSNumber,
      examNumber: getStudent.examNumber,
      certificateNumber: getStudent.ijazahNumber,
      SKHUNNumber: getStudent.SKHUNNumber,
    },
    parentPhone: getStudent.parentPhoneNumber,
    birth: {
      place: getStudent.birthplace,
      date: getStudent.birthdate,
    },
    religion: getStudent.religion,
    nationality: getStudent.nationality,
    family: {
      childPosition: getStudent.birthPosition,
      siblingCount: getStudent.siblingCount,
      stepSiblingCount: getStudent.stepSiblingCount,
      adoptedSiblingCount: getStudent.fosterSiblingCount,
      familyStatus: getStudent.familyStatus,
    },
    motherLanguage: getStudent.motherLanguage,
    livingWith: getStudent.livingWith,
    homeToSchoolDistance: getStudent.schoolDistance,
    address: getStudent.address,
    body: {
      sex: getStudent.gender,
      weight: getStudent.weight,
      height: getStudent.height,
      bloodType: getStudent.bloodType,
      bloodRhesus: getStudent.bloodRhesus,
    },
    lastEducation: {
      id: getStudent.formerSchool?.id,
      grade: getStudent.formerSchool?.type,
      school: getStudent.formerSchool?.name,
      graduateYear: getStudent.schoolGraduateYear,
    },
    father: {
      fullName: getStudent.fatherFullname,
      birthDate: getStudent.fatherBirthdate,
      nationality: getStudent.fatherNationality,
      education: getStudent.fatherLastEducation,
      occupation: getStudent.fatherJob,
      income: getStudent.fatherIncome,
      address: getStudent.fatherAddress,
    },
    mother: {
      fullName: getStudent.motherFullname,
      birthDate: getStudent.motherBirthdate,
      nationality: getStudent.motherNationality,
      education: getStudent.motherLastEducation,
      occupation: getStudent.motherJob,
      income: getStudent.motherIncome,
      address: getStudent.motherAddress,
    },
    bioEditProgress: {
      basic: "Y",
      number: "Y",
      advanced: "Y",
      additional: "Y",
      address: "Y",
      parent: "Y",
    },
  });
};
