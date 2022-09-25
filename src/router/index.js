import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // Public routes
  // Home
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/public/Home.vue'),
  },

  // Auth routes
  // Login
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },

  // Private routes
  // Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/private/Dashboard.vue'),
    children: [
      // Dashboard/Overview
      {
        path: "overview",
        name: "Overview",
        component: () => import("@/views/private/dashboard-views/Overview.vue"),
      },
      // Dashboard/Departments
      {
        path: "departments",
        name: "Departments",
        component: () => import("@/views/private/dashboard-views/Departments.vue"),
      },
      // Dashboard/Department profile
      {
        path: "department-profile/:profileId",
        name: "DepartmentProfile",
        component: () => import("@/views/private/dashboard-views/DepartmentProfile.vue"),
      },
      // Dashboard/Services
      {
        path: "services",
        name: "Services",
        component: () => import("@/views/private/dashboard-views/Services.vue"),
      },
      // Dashboard/DepartmentsServices
      {
        path: "department-services/:id",
        name: "DepartmentServices",
        component: () => import("@/views/private/dashboard-views/DepartmentServices.vue"),
      },
      // Dashboard/Employees
      {
        path: "employees",
        name: "Employees",
        component: () => import("@/views/private/dashboard-views/Employees.vue"),
      },
      // Dashboard/EmployeeProfile
      {
        path: "employee-profile/:profileId",
        name: "EmployeeProfile",
        component: () => import("@/views/private/dashboard-views/EmployeeProfile.vue"),
      },
      // Dashboard/Roles
      {
        path: "roles",
        name: "Roles",
        component: () => import("@/views/private/dashboard-views/Roles.vue"),
      },
      // Dashboard/Doctors
      {
        path: "doctors",
        name: "Doctors",
        component: () => import("@/views/private/dashboard-views/Doctors.vue"),
      },
      // Dashboard/DoctorProfile
      {
        path: "doctor-profile/:profileId",
        name: "DoctorProfile",
        component: () => import("@/views/private/dashboard-views/DoctorProfile.vue"),
      },
      // Dashboard/Assistants
      {
        path: "assistants",
        name: "Assistants",
        component: () => import("@/views/private/dashboard-views/Assistants.vue"),
      },
      // Dashboard/AssistantProfile
      {
        path: "assistant-profile/:profileId",
        name: "AssistantProfile",
        component: () => import("@/views/private/dashboard-views/AssistantProfile.vue"),
      },
      // Dashboard/My_account
      {
        path: "my_account",
        name: "MyAccount",
        component: () => import("@/views/private/dashboard-views/MyAccount.vue"),
      },
      // Dashboard/My_tasks
      {
        path: "my_tasks",
        name: "MyTasks",
        component: () => import("@/views/private/dashboard-views/MyTasks.vue"), 
      },
      // Dashboard/taxes
      {
        path: "taxes",
        name: "Taxes",
        component: () => import("@/views/private/dashboard-views/Taxes.vue"),
      },
      // Dashboard/coupones
      // {
      //   path: "coupones",
      //   name: "Coupones",
      //   component: () => import("@/views/private/dashboard-views/Coupones.vue"),
      // },
      // Dashboard/Projects
      {
        path: "projects",
        name: "Projects",
        component: () => import("@/views/private/dashboard-views/Projects.vue"),
      },
      // Dashboard/ProjectProfile
      {
        path: "project-profile/:profileId",
        name: "ProjectProfile",
        component: () => import("@/views/private/dashboard-views/ProjectProfile.vue"),
      },
      // Dashboard/Leads
      {
        path: "leads",
        name: "Leads",
        component: () => import("@/views/private/dashboard-views/Leads.vue"),
      },
      // Dashboard/PublicForms
      {
        path: "public-forms",
        name: "PublicForms",
        component: () => import("@/views/private/dashboard-views/PublicForms.vue"),
      },
      // Dashboard/Reservations
      {
        path: "reservations",
        name: "Reservations",
        component: () => import("@/views/private/dashboard-views/Reservations.vue"),
      },
       // Dashboard/Reservation profile
      {
        path: "reservation-profile/:profileId",
        name: "ReservationProfile",
        component: () => import("@/views/private/dashboard-views/ReservationProfile.vue"),
      },
      // Dashboard/Reports
      {
        path: "reports",
        name: "Reports",
        component: () => import("@/views/private/dashboard-views/Reports.vue"),
      },
      // Dashboard/BudgetForms
      // {
      //   path: "budget-forms",
      //   name: "BudgetForms",
      //   component: () => import("@/views/private/dashboard-views/BudgetForms.vue"),
      // },
      // Dashboard/Branches
      {
        path: "branches",
        name: "Branches",
        component: () => import("@/views/private/dashboard-views/Branches.vue"),
      },
      // Dashboard/Invoices
      {
        path: "invoices",
        name: "Invoices",
        component: () => import("@/views/private/dashboard-views/Invoices.vue"),
      },       
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;