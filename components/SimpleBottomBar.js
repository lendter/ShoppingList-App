import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';

export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(1);

    useEffect(() => {
        const getValue = async () => {
            let val = window.localStorage.getItem("tab");
            if(val != null){
                setValue(val);
            }else{
                window.localStorage.setItem("tab", value);
            }
        }

        getValue();
    }, []);
    return (
      <Box sx={{ width: "100%", position: "absolute", bottom: "0"}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            window.localStorage.setItem("tab", newValue);
          }}
        >
          <BottomNavigationAction label="Email" icon={<EmailIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Box>
    );
}