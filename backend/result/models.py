from django.db import models


class Result(models.Model):
    active = models.BooleanField(default=False)
    image = models.ImageField(upload_to='media/results')
    caption = models.CharField(blank=True, default="", max_length=255)

    def __str__(self):
        return f'{self.id}: {self.caption}, active:{self.active}'
