import { Routes } from "react-router-dom";

import { publicRoutes } from "./public.routes";
import { jobseekerRoutes } from "./jobseeker.routes";
import { employerRoutes } from "./employer.routes";
import { adminRoutes } from "./admin.routes";

const AppRoutes = () => {
    return (
        <Routes>
            {publicRoutes}
            {jobseekerRoutes}
            {employerRoutes}
            {adminRoutes}
        </Routes>
    );
};

export default AppRoutes;