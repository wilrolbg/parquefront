import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
     /* {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },*/
      {
        path: "dashboard",
        name: "Procesos",
        component: () => import('@/components/procesos/procesos')
      },      
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: () => import('@/components/configuracion/descuentos')
      },
      {
        path: "maps",
        name: "maps",
        component: () => import('@/components/reportes/reportes')
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: () => import('@/components/configuracion/tarifas')
      }/*,
      {
        path: '/procesos',
        name: 'procesos',   
        component: () => import('@/components/procesos/procesos')
      }      */
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
