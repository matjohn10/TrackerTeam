import WidthWrapper from "./WidthWrapper";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";

const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const getInitials = () => {
    const first = user.given_name && user.given_name[0].toUpperCase();
    const last = user.family_name && user.family_name[0].toUpperCase();
    return first && last ? first + last : "";
  };
  return (
    <nav className="flex sticky top-0 w-full z-20 bg-inherit border-b border-neutral-200 border-solid">
      <WidthWrapper>
        <div className="flex sticky top-0 w-full h-15 p-5 justify-between items-center">
          <div>
            <Link href="/">
              <Image
                className="w-8 h-8"
                src="/TrackerTeam-logo-nobg.png"
                alt="logo"
                width={500}
                height={499}
              />
            </Link>
          </div>
          {user ? (
            <div className="flex gap-10 items-center">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="text-lg">Home</span>
              </Link>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="text-lg">Dashboard</span>
              </Link>

              <LogoutLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="text-lg">Logout</span>
              </LogoutLink>
              <Button className="w-12 h-12 rounded-full" asChild>
                <Link href="/profile">
                  <div>
                    <span className="text-lg">{getInitials()}</span>
                  </div>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-10 items-center">
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="text-lg">Login</span>
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: "sm",
                })}
              >
                <span className="text-lg">Sign Up</span>
              </RegisterLink>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href="https://ably.com/docs"
                target="_blank"
              >
                <Image
                  className="w-6 h-6"
                  src="/ably-logo.png"
                  alt="ably logo"
                  width={61}
                  height={61}
                />
              </Link>
            </div>
          )}
        </div>
      </WidthWrapper>
    </nav>
  );
};

export default Header;
