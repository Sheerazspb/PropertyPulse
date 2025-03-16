"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  VKShareButton,
  VKIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
      <h3 className="text-xl text-center font-bold pt-1">Share Property</h3>
      <div className="flex gap-3 justify-center pb-1">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator="::"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing ${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
        <VKShareButton url={shareUrl} title={property.name}>
          <VKIcon size={40} round />
        </VKShareButton>
      </div>
      {/* </div> */}
    </>
  );
};

export default ShareButtons;
