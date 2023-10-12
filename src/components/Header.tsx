import WidthWrapper from "./WidthWrapper";

const Header = () => {
  return (
    <WidthWrapper>
      <div className="flex sticky top-0 w-full h-15  p-5 justify-between items-center">
        <div>Logo</div>
        <div>Nav Links</div>
      </div>
    </WidthWrapper>
  );
};

export default Header;
