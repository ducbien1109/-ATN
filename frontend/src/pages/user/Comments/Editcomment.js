import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { API, MESSAGE } from "@Const";
import { Input, Button } from "antd";

const EditComment = ({ comment, onSave, onCancel }) => {
  const [editedContent, setEditedContent] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const accessToken = cookies.access_token;

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (editedContent.trim() === "") {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("commentID", comment);
      formData.append("content", editedContent);
      const url = API.PUBLIC.EDIT_COMMENT;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        onSave(comment, editedContent);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      window.location.reload();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div key={comment} className="">
      <form onSubmit={handleSave} className="edit-comment-form">
        <Input
          className="input"
          placeholder="nhập chỉnh sửa"
          value={editedContent}
          onChange={handleContentChange}
        />
        <div className="edit-comment-buttons">
          <Button
            Dashed
            color="primary"
            variant="dashed"
            className="edit-comment-save"
            onClick={handleSave}
          >
            Lưu
          </Button>
          <Button
            color="primary"
            variant="dashed"
            className="edit-comment-cancel"
            onClick={handleCancel}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
