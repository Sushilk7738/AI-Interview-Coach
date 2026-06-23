from django.contrib import admin
from .models import Question, Evaluation, Interview, Answer, Role


admin.site.register(Role)
admin.site.register(Question)
admin.site.register(Interview)
admin.site.register(Answer)
admin.site.register(Evaluation)
