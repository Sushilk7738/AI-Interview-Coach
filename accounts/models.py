from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass



class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name



class Question(models.Model):
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    
    question_text=models.TextField()

    def __str__(self):
        return self.question_text


class Interview(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="interviews" 
    )
    
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="interviews"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.user.username} - {self.role.name}"



class Answer(models.Model):
    interview = models.ForeignKey(
        Interview,
        on_delete=models.CASCADE,
        related_name='answers'
    )
    
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='questions'
    )
    
    answer_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Answer for {self.question.id}"




class Evaluation(models.Model):
    answer = models.OneToOneField(
        Answer,
        on_delete=models.CASCADE,
        related_name="evaluation"
    )

    score = models.IntegerField()

    strengths = models.TextField()

    weakness = models.TextField()

    feedback = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evaluation {self.score}/10"






















    
"""
*
* ForeignKey      → One-to-Many
* OneToOneField   → One-to-One
* ManyToManyField → Many-to-Many
*
"""