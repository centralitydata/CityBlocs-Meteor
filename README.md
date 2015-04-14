# CityBlocs with Meteor.js

**This is non-functional, pre-alpha software**

The existing site is live at [cityblocs.ca](http://www.cityblocs.ca/), though
its source is not open (and for good reason -- you wouldn't want to work with
it!). The goal of this project is to launch an open-source, reusable version
that includes enhanced functionality over the relatively static content of the
current site.

## Quickstart ##

    $ git clone https://github.com/centralitydata/CityBlocs-Meteor.git cityblocs
    $ cd cityblocs
    $ meteor

Then browse to [localhost:3000](http://localhost:3000) and start your own
CityBlocs distribution. Just don't expect to much of it yet!

## Meteor packages ##

We are currently using these Meteor packages:
  * accounts-password
  * accounts-ui
  * iron:router
  * markdown
  * meteor-platform
  * twbs:bootstrap

----

# Data structures #

Cities, councils, and motions are each stored in their own collection for ease
of querying, despite the inherently hierarchical nature that would otherwise
lend itself so well to each city's being a single, self-contained document.

Each city is stored as a document of the form:

    {
      _id: 'unique Meteor ID',
      name: 'City Name',
      hidden: true/false,
    }

A council is defined as

    {
      _id: 'unique Meteor ID',
      city_id: _id of a city,
      name: 'Council Name',
      timeframe: { start, finish },
      hidden: true/false,
      councillors: [ ... ]
    }

And a motion:

    {
      _id: 'unique Meteor ID',
      name: 'Motion name or tag',
      date: timestamp,
      votes: [ ... ]
    }
