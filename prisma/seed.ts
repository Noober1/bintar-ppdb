import { ROLES } from "../src/constants/roles";
import { Major, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const majorData: Omit<Major, "id">[] = [
      {
        initial: "TKR",
        name: "Teknik Kendaraan Ringan",
      },
      {
        initial: "TKJ",
        name: "Teknik Komputer dan Jaringan",
      },
      {
        initial: "JB",
        name: "Jasa Boga",
      },
      {
        initial: "TBSM",
        name: "Teknik dan Bisnis Sepeda Motor",
      },
      {
        initial: "APH",
        name: "Akomodasi Perhotelan",
      },
    ];

    // seeding major
    await prisma.major.createMany({
      data: majorData,
      skipDuplicates: true,
    });
    console.log("seeding major ok");

    // seeding config
    await prisma.config.createMany({
      data: [
        {
          year: new Date().getFullYear(),
          isActive: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log("seeding config ok");

    //seeding user
    await prisma.user.createMany({
      data: [
        {
          email: "cucu.ruhiyatna3@gmail.com",
          fullname: "Cucu Ruhiyatna",
          type: "ADMINISTRATOR",
          grantedAccess: JSON.stringify(ROLES),
          password: bcrypt.hashSync("lordazzura123", 10),
        },
        {
          email: "ujk.bintar@gmail.com",
          fullname: "Administrator",
          type: "USER",
          grantedAccess: JSON.stringify(ROLES),
          password: bcrypt.hashSync("bintar701", 10),
        },
      ],
      skipDuplicates: true,
    });
    console.log("seeding user ok");

    //seeding school
    await prisma.school.createMany({
      data: [
        {
          NPSN: 123123,
          name: "SMPN 1 Jalancagak",
          type: "SMP",
          address:
            "Jl. Cagak No. 23 RT. 16 RW. 02 Desa Jalancagak, Kecamatan Jalancagak, Subang - 41281",
        },
      ],
      skipDuplicates: true,
    });
    console.log("seeding school ok");
  } catch (error) {
    console.error(error);
    console.error("error seeding database");
  }
};

seed().then((result) => {
  console.log("ALL OK!! :)");
});
