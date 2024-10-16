import Image from "next/image";
import styles from "./EditExchangeInfo.module.css";
import editIcon from "@/public/edit-icon.svg";
import GradeCategory from "./info/GradeCategory";
import Button from "../buttons/Button";

export default function EditExchangeInfo() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>
        <Image src={editIcon} alt="edit-icon" />
        교환 희망 정보
      </div>
      <GradeCategory style={"medium"} />
      <div className={styles["content"]}>content about exchange request</div>
      <div className={styles["button-container"]}>
        <Button children={"수정하기"} style={"thick-main-440px"} />
        <Button children={"판매 내리기"} style={"thick-black-440px"} />
      </div>
    </div>
  );
}
