// ReplyModal.jsx — separate component
import { Modal, Button } from "antd";
import { useState, useEffect } from "react";

export function ReplyModal({ open, record, onClose, onSend }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [record]);

  return (
    <Modal
      title="Feedback Reply"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      {record && (
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700 mb-2">
              Feedback form: {record.name}
            </p>
            <div className="rounded-md border p-3 text-gray-700 bg-white">
              {record.feedback}
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-2">Your Reply :</p>
            <textarea
              className="w-full rounded-md border p-3 text-gray-700"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="text-center">
            <Button type="primary" onClick={() => onSend(text)}>
              Send
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
