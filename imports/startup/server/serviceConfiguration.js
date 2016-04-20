import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
  const services = Meteor.settings.private.oAuth;

  if (services) {
    for (const service in services) {
      if (services.hasOwnProperty(service)) {
        ServiceConfiguration.configurations.upsert({ service }, {
          $set: services[service]
        });
      }
    }
  }
});
