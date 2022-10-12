import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const showToast = toastMessage => toast.success(toastMessage, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
