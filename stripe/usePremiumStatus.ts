import { useState, useEffect } from "react";
import firebase from "../firebase/firebaseClint";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: firebase.User) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPremium());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}