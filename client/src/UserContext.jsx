
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [ownerName, setOwnerName] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('token');

        if (token) {
          const response = await axios.get('https://hotel-booking-webiste.vercel.app/api/v1/auth/getuser', {
            headers: {
              Authorization: `${token}`,
            },
          });

          setUser(response.data.user);

          // Set the owner name in the state
          setOwnerName(response.data.user.name);
          setReady(true); // Set ready to true once the user details are fetched
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ownerName, ready }}>
      {children}
    </UserContext.Provider>
  );
}
