import { useRef, useEffect } from "react";
import { useEditMode } from "../context/EditContext.jsx";

export default function EditableText({ id, defaultText, tag: Tag = "span", style, className }) {
  const { isEditing } = useEditMode();
  const ref = useRef(null);

  const storageKey = `editable:${id}`;
  const saved = localStorage.getItem(storageKey);
  const text = saved !== null ? saved : defaultText;

  // Sync contentEditable toggle
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isEditing) {
      el.contentEditable = "true";
      el.style.outline = "1px dashed rgba(77,163,245,0.6)";
      el.style.borderRadius = "3px";
      el.style.cursor = "text";
      el.style.minWidth = "2px";
    } else {
      el.contentEditable = "false";
      el.style.outline = "";
      el.style.cursor = "";
    }
  }, [isEditing]);

  function handleBlur(e) {
    localStorage.setItem(storageKey, e.currentTarget.innerText);
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      suppressContentEditableWarning
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
