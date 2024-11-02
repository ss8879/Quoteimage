"use client";
import { useRouter } from "next/navigation";
import { apiconnector } from "../apiconnector";
import { setToken } from "@/app/redux/slices/userslice";
import { Userroutes } from "./api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Jaldi } from "next/font/google";
export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  async function sendotpop(email) {
    console.log("email value is:", email);
    const toastid = toast.loading("Loading....");
    try {
      const otpres = await apiconnector("POST", Userroutes.sendotp, {
        email: email,
      });
      console.log("send otp response:", otpres);
      router.push("/otp");
      toast.dismiss(toastid);
      toast.success("Otp Sent To the mail");
    } catch (error) {
      console.log("error occured in sendotpop function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  async function startsignup({
    email,
    password,
    confirmpassword,
    firstname,
    lastname,
    otp1,
  }) {
    console.log(email, password, firstname, lastname, otp1);
    const toastid = toast.loading("Loading....");
    try {
      const signupres = await apiconnector("POST", Userroutes.signup, {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        otp: otp1,
      });
      console.log("Signing Up", signupres);

      router.push("/login");
      toast.dismiss(toastid);
      toast.success("Signed Up");
    } catch (error) {
      console.log("error occured in signup function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  async function login_op({ email, password }) {
    const toastid = toast.loading("Loading....");
    try {
      console.log("email and password", email, password);
      const loginres = await apiconnector("POST", Userroutes.login, {
        email: email,
        password: password,
      });
      console.log("login response:", loginres);
      router.push("/");
      const token = loginres.data.token;
      console.log("token value is:", token);
      dispatch(setToken({ token, email }));
      toast.dismiss(toastid);
      toast.success("Logged In");
    } catch (error) {
      console.log("error occured in login_op function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }

  async function uploadtocloud(imageBlob, imagename, email) {
    const toastid = toast.loading("uploading....");
    try {
      console.log("imageurl and name are", imagename, imageBlob);
      // Create FormData object to send file
      console.log("blob value:", typeof imageBlob);
      const formData = new FormData();
      formData.append("file", imageBlob, "file.jpg"); // Adjust filename as needed

      // Add other required parameters
      formData.append("email", email);
      formData.append("imgname", imagename);

      // Perform upload to cloud service
      const response = await apiconnector("POST", Userroutes.upload, formData,{
        'Access-Control-Allow-Origin': '*'
      });
      console.log("response", response);
      toast.dismiss(toastid);
      toast.success("Uploaded To cloud");
    } catch (error) {
      console.error("Error occurred in uploadtocloud function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occurred");
    }
  }

  async function getcreations_op(email, token) {
    const toastid = toast.loading("Loading....");
    try {
      console.log("email and token are", email, token);
      const getcreationsres = await apiconnector(
        "GET",
        Userroutes.getcreations,
        {},
        { Authorization: `Bearer ${token}` }
      );
      console.log("getcreationsres response:", getcreationsres);
      toast.dismiss(toastid);
      toast.success("Creations Fetched");
      return getcreationsres;
    } catch (error) {
      console.log("error occured in getcreations function :", error.message);
      toast.dismiss(toastid);
      toast.error("Error Occured");
      return [];
    }
  }
  async function getcreationbyid_op(token, imageid) {
    const toastid = toast.loading("Loading....");
    try {
      // console.log("email and token are", email, token);
      const getcreationsbyidres = await apiconnector(
        "POST",
        Userroutes.getcreationbyid,
        {
          imageid: imageid,
        },
        { Authorization: `Bearer ${token}` }
      );
      console.log("getcreationsres response:", getcreationsbyidres);
      toast.dismiss(toastid);
      toast.success("Image Fetched");
      return getcreationsbyidres;
    } catch (error) {
      console.log(
        "error occured in getcreationsbyid function :",
        error.message
      );
      toast.dismiss(toastid);
      toast.error("Error Occured");
      return "";
    }
  }
  async function uploadfiletotwittercloud_op(imageblob, email) {
    const toastid = toast.loading("uploading....");
    try {
      console.log("blob value:", imageblob);
      const formData = new FormData();

      formData.append("files", imageblob, "files.jpg");

      formData.append("email", email);

      const response = await apiconnector(
        "POST",
        Userroutes.twitfileupload,
        formData,
        {
          'Access-Control-Allow-Origin': '*'
        }
      );
      // console.log("response", response);
      toast.dismiss(toastid);
      toast.success("Uploaded To Twitter servers");
      return response
    } catch (error) {
      console.error(
        "Error occurred in uploadfiletotwittercloud_op function :",
        error
      );
      toast.dismiss(toastid);
      toast.error("Error Occurred");
      return ""
    }
  }
  async function tweet(email)
  {
      // console.log("email value in users:",email)
      const toastid = toast.loading("tweeting....");
      try {
        const response = await apiconnector(
          "POST",
          Userroutes.tweet,
          {email:email}
        );
        console.log("response", response);
        toast.dismiss(toastid);
        toast.success("Uploaded To Twitter");
        return response
      } catch (error) {
        console.error(
          "Error occurred in tweet function :",
          error
        );
        toast.dismiss(toastid);
        toast.error("Error Occurred");
        return ""
      }
  }
  return {
    sendotpop,
    startsignup,
    login_op,
    uploadtocloud,
    getcreations_op,
    getcreationbyid_op,
    uploadfiletotwittercloud_op,
    tweet
  };
}
