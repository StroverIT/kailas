import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { GalleryManager } from "@/components/admin/gallery/GalleryManager";

const AdminGalleryPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return <GalleryManager />;
};

export default AdminGalleryPage;
