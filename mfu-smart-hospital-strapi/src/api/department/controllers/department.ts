/**
 * department controller
 */
import { factories } from '@strapi/strapi';

const departmentController = factories.createCoreController('api::department.department', ({ strapi }) => ({
  // Method to find all departments
  async find(ctx) {
    const { query } = ctx;
    const departments = await strapi.service('api::department.department').find(query);
    return departments;
  },
}));

export default factories.createCoreController('api::department.department');
