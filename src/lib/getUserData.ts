import { prisma } from "@/lib/prisma";

const getUserData = async (id?: number | null) => {
  if (!id) return undefined;
  try {
    const getData = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        type: true,
        fullname: true,
        grantedAccess: true,
      },
      where: {
        id,
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
