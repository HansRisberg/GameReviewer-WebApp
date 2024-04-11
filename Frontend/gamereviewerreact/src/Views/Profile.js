import ProfilePage from "../Components/ProfilePage";

const ProfileView = () => {
    return(
        <div>
            <h1>Profile View</h1>
            <p>This is where you can view your profile</p>
           <ProfilePage/>
        </div>
    );
};

export default ProfileView;


// import ProfilePage from '../Components/ProfilePage';
// import { useAuth } from '../Contexts/AuthContext'; // Importing useAuth hook instead of getCurrentUserId

// const ProfileView = () => {
//     const { userId } = useAuth(); // Extracting userId from useAuth hook

//     return (
//         <div>
//             <h1>Profile View</h1>
//             <p>This is where you can view your profile</p>
//             {userId && <ProfilePage userId={userId} />} {/* Render ProfilePage only if userId is available */}
//         </div>
//     );
// };

// export default ProfileView;


