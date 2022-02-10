import Cookies from "universal-cookie";

export const getUserInfo = async () => {
    const cookies = new Cookies();

    try {
        const response = await fetch("https://magous.fr/baptiste/codev/codev/public/api/whoami", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.get("token"),
            },
            body: JSON.stringify({
                user_token: cookies.get("token")
            }),
        });
        if (response.status == 200) {
            const data = await response.json();
            return data;
        } else {
            console.log("Response status: ", response.status);
            return null;
        }
    } catch(error) {
        console.log("Error: ", error);
    }
};

export const getBatimentsData = async (batiments) => {
    const cookies = new Cookies();

    try {
        const response = await fetch("https://magous.fr/baptiste/codev/codev/public/api/batiments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.get("token")
            },  
        });
        if (response.status == 200) {
            const data = await response.json();
            return data;
        } else {
            console.log("Response status: ", response.status);
            return null;
        }
    } catch(error) {
        console.log("Error: ", error);
    }
};