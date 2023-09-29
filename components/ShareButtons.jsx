import ShareLinkButton from "./ShareLinkButton";

export default function ShareButtons() {
  console.log("[ShareButtons] rendering");
  return (
    <div className="flex">
      <ShareLinkButton /> | [Twitter] | [Facebook]
    </div>
  );
}
