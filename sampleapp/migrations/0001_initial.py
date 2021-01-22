# Generated by Django 3.1.5 on 2021-01-20 18:40

import random
import string

from django.db import migrations, models
import django.db.models.deletion


def fill_models(apps, schema):
    Foo = apps.get_model('sampleapp', 'Foo')
    Bar = apps.get_model('sampleapp', 'Bar')

    foos = []
    bars = []
    for i in range(1000):
        name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        foos.append(Foo(id=i, name=name))

        for _ in range(10):
            extra_name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=2))
            bars.append(Bar(name=extra_name, foo_id=i))

    Foo.objects.bulk_create(foos)
    Bar.objects.bulk_create(bars)

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Foo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Bar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('foo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sampleapp.foo')),
            ],
        ),
        migrations.RunPython(fill_models, migrations.RunPython.noop)
    ]
