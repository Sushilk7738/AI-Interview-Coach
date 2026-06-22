from django.contrib import admin
from .models import User, Role, Question, Interview, Answer, Evaluation

admin.site.register(User)
admin.site.register(Role)
admin.site.register(Question)
admin.site.register(Interview)
admin.site.register(Answer)
admin.site.register(Evaluation)

