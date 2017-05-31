---
layout: page
title:  "Heroku + Django Pipeline + Sass"
date:   2017-05-30 00:00:00 -0700
description: "getting django pipeline to use its sass compiler on heroku"
---

*(valid as of March 30th 2017)*

## What you have

A currently existing django project, hosted on heroku, with a bunch of css

## What you want

- to have your css compiled from sass
- for that compilation to be done with ruby, during the heroku build

## How you get it

heroku setup

```
# bash
heroku buildpacks:add heroku/ruby --index 1 --app $APP_NAME
```

django pipeline setup

```
# config/settings/base.py
PIPELINE = {
    'COMPILERS': (
        'pipeline.compilers.sass.SASSCompiler',
    ),
}
```

sass setup

```
# Gemfile
source "https://rubygems.org"
ruby '2.3.3'

gem "sass"
gem "susy"
```

### Ok but that didn't work

or at least it didn't for me, I got this (formatted for readability) error

```
pipeline.exceptions.CompilerError: <filter object at 0x1337> exit code 1
b"/tmp/DIR/vendor/ruby-2.3.3/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require':
    cannot load such file -- bundler/setup (LoadError)
    from /tmp/DIR/vendor/ruby-2.3.3/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /tmp/DIR/vendor/bundle/bin/sass:15:in `<main>"
```

and after a lot of fiddling and staring at that error message, it occurred to me that maybe python wasn't calling the right `sass`. Which inspired the following "fix"

### How you get it, but for real this time

Install your gems to whatever `ruby` / `sass` the python buildpack is calling

```
# bin/pre_compile
gem install bundler
bundle install
```

(`pre_compile` is a hook for the python buildpack)

Does this mean `heroku buildpacks:add heroku/ruby --index 1` is unused? Probably. Someone investigate this and [let me know](https://twitter.com/lynncyrin).

## Get this fixed for good!

One of the devs of the projects below will probably know what's up

- <https://github.com/jazzband/django-pipeline>
- <https://github.com/heroku/heroku-buildpack-ruby>
- <https://github.com/heroku/heroku-buildpack-python>

But if you just want a fix for your project, the `pre_compile` script will do just fine
