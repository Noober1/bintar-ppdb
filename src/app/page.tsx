import { redirect } from "next/navigation";

const MainPage = async () => {
  return redirect("/home");
};

export default MainPage;
