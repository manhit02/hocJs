import appSlice from "@/app/appSlice";
import { useDispatch } from "react-redux";

export const RenderModal = ({ children }: any) => {
  const dispatch = useDispatch();
  const { updateModalState } = appSlice.actions;
  return (
    <div
      className="react-modal-provider"
      onClick={(e) => {
        dispatch(updateModalState(null));
      }}
    >
      {children}
    </div>
  );
};
