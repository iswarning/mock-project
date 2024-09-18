import toast from "react-hot-toast";
import { TOAST } from "../store/constants";

export const ToastCommon = (type, message) => {
  toast.dismiss();
  switch (type) {
    case TOAST.SUCCESS:
      toast.success(message);
      break;
    case TOAST.ERROR:
      toast.error(message);
      break;

    default:
      toast.error("toast type not found");
      break;
  }
};
