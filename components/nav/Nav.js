import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import mainLogo from "@/public/logo.svg";
import listIcon from "@/public/nav-list.svg";
import styles from "./Nav.module.css";
import Loggedin from "./Loggedin";
import NonLogin from "./NonLogin";
import useAuthStore from "@/store/useAuthStore";
import { usePostSignout } from "@/lib/reactQuery/useAuth";

export default function Nav({ handlePointModal }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [userDrop, setUserDrop] = useState(false);

  const usePostSignoutMutation = usePostSignout();

  const handleUserDrop = () => {
    setUserDrop((prevState) => !prevState); // 이전 상태에 따라 토글
  };

  const handleMobileUserDrop = (e) => {
    e.stopPropagation();
    setUserDrop((prevState) => !prevState); // 이전 상태에 따라 토글
  };

  const handleSignout = () => {
    usePostSignoutMutation.mutate(null, {
      onSuccess: () => {
        console.log("로그아웃 성공");
        logout();
        router.push("/"); // 홈페이지로 리다이렉트
      },
      onError: () => {
        console.log("로그아웃 실패:", error);
      },
    });
  };

  return (
    // 로그인과 회원가입 부분에 Nav가 안보이게 하기 위해
    // pathname을 이용하여 다른 style이 적용되게 했습니다.
    <div>
      <header
        className={`${styles["nav"]} ${
          router.pathname === "/auth/signin" ||
          router.pathname === "/auth/signup"
            ? styles["nav-none"]
            : ""
        }`}
      >
        <div className={styles["container"]}>
          <div className={styles["list"]} onClick={handleMobileUserDrop}>
            <Image src={listIcon} alt="list-icon" />
          </div>
          <Link href="/">
            <Image src={mainLogo} className={styles["logo"]} alt="logo" />
          </Link>
          {user ? (
            <>
              <div onClick={handlePointModal}>🎁</div>
              <Loggedin
                nickname={user.data.nickname}
                point={user.data.point}
                onClick={handleUserDrop}
                logout={handleSignout}
                userDrop={userDrop}
                setUserDrop={setUserDrop}
              />
            </>
          ) : (
            <NonLogin />
          )}
        </div>
      </header>
    </div>
  );
}
