import { prisma } from "@/lib/prisma";

const getUserData = async (email?: string) => {
  if (!email) return undefined;
  try {
    const getData = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        type: true,
        fullname: true,
        grantedAccess: true,
      },
      where: {
        email,
      },
    });

    return {
      ...getData,
      grantedAccess: JSON.parse(getData?.grantedAccess as string),
    };
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export default getUserData;
