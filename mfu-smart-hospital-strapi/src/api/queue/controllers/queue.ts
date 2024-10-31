/**
 * queue controller
 */
import { factories } from '@strapi/strapi'

const queueController = factories.createCoreController('api::queue.queue', ({ strapi }) => ({
    // Example method to find all appointments
    async find(ctx) {
      const { query } = ctx;
      const appointments = await strapi.service('api::queue.queue').find(query);
      return appointments;
    },
  
    // Example method to create a new appointment
    async create(ctx) {
      const { body } = ctx.request;
      const newAppointment = await strapi.service('api::queue.queue').create({ data: body });
      return newAppointment;
    },
  
    // Example method to update an appointment by ID
    async update(ctx) {
      const { id } = ctx.params;
      const { body } = ctx.request;
      const updatedAppointment = await strapi.service('api::queue.queue').update(id, { data: body });
      return updatedAppointment;
    },
  
    // Example method to delete an appointment by ID
    async delete(ctx) {
      const { id } = ctx.params;
      await strapi.service('api::queue.queue').delete(id);
      return { message: 'Appointment deleted successfully' };
    },
  }));

export default factories.createCoreController('api::queue.queue');
