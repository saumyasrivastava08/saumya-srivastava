import Navbar from "./Navbar";
import CometCursor from "../ui/CometCursor";
import ScrollRail from "../ui/ScrollRail";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ScrollRail />
      <CometCursor />
    </>
  );
}
