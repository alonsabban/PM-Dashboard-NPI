import { createContext, useContext, useState } from "react";

const EditContext = createContext({ isEditing: false, setIsEditing: () => {} });

export function EditProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <EditContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditContext);
}
