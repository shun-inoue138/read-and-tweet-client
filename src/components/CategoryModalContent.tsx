import React from "react";
import { useCreateCategory } from "src/api/categoriesAPI";
import useUserStore from "src/stores/useUserStore";
import { myToast } from "src/utils/functions/toastWrapper";

const CategoryModalContent = ({ closeModal, mutate }) => {
  const categoryInputRef = React.useRef<HTMLInputElement>(null);
  const { createCategory } = useCreateCategory();

  return (
    <div>
      <input ref={categoryInputRef} type="text" />
      <button
        onClick={() => {
          const categoryName = categoryInputRef.current?.value as string;
          categoryName &&
            createCategory(categoryName)
              .then(() => {
                myToast("カテゴリーを追加しました", "success");
                closeModal();
                mutate();
              })
              .catch((error) => {
                console.log(error);
                myToast("カテゴリーの追加に失敗しました", "error");
              });
        }}
      >
        追加
      </button>
    </div>
  );
};

export default CategoryModalContent;
