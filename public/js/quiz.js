(function () {
  var Animal = Backbone.Model.extend({
    initialize: function () {
      this.set('cid', this.cid);
    }
  });

  // a question is a collection of animals and a sound file
  var Question = Backbone.Collection.extend({
    model: Animal,

    render: function () {
      Question.current = this;
      $('#answers').html('');
      this.each(function (animal) {
        new AnimalView({ model: animal }).render();
      });
    },

    playSound: function () {
      this.sound && this.sound.pause();
      this.sound = new Audio(
        'data/' + this.correctAnswer().get('sound')
      );
      this.sound.play();
    },

    correctAnswer: function () {
      return this.find(function (answer) {
        return answer.get('correct');
      });
    },

    highlightCorrect: function () {
      this.correctAnswer().trigger('highlight');
    }
  });

  var Quiz = Backbone.Model.extend({
    render: function () {
      var numberView = new QuestionNumber(),
          total = this.get('questions').length;

      this.set('total', total);
      this.set('correct', 0);
      this.set('numberView', numberView);
      numberView.render(total);
      this.showNext();
      new PlayAgain().render();
    },

    showNext: function () {
      this.currentQuestion = this.get('questions').pop();
      this.currentQuestion.render();
      this.currentQuestion.playSound();
      this.get('numberView').updateCurrent(this.get('total') - this.get('questions').length);
    }
  });

  var AnimalView = Backbone.View.extend({
    template: _.template($('#animal-template').html()),

    initialize: function () {
      this.listenTo(this.model, 'highlight', this.highlight);
    },

    render: function () {
      var el = $(this.template(this.model.attributes));

      $('#answers').append(el);
      this.setElement(el);
    },

    events: {
      'click': 'validate'
    },

    validate: function () {
      var correct = this.model.get('correct'),
          question = Question.current;
      if (!correct) {
        this.$el.css('background', '#f0c0ac')
      } else {
        GAME.quiz.set('correct', GAME.quiz.get('correct') + 1);
      }

      question.highlightCorrect();
      var answer = new AnswerView().render(correct, question.correctAnswer());
    },

    highlight: function () {
      this.$el.css('background', '#c0f0ac')
    }
  });

  var AnswerView = Backbone.View.extend({
    el: '.next-question',

    render: function (correct, animal) {
      var el = _.template($('#answer-template').html(), {
        correct: correct,
        animal: animal,
        last: GAME.quiz.get('questions').length == 0,
        quiz: GAME.quiz.attributes
      });
      $('body').append(el);

      this.setElement(el);
      this.$el.modal();
    },

    events: {
      'click': function () {
        GAME.quiz.showNext();
        this.$el.modal('hide');
      }
    }
  });

  var PlayAgain = Backbone.View.extend({
    initialize: function () {
      this.setElement($('#play-again'));
      this.$el.removeClass('hidden');
    },

    events: {
      'click': function () {
        GAME.quiz.currentQuestion.playSound();
      }
    }
  });

  var QuestionNumber = Backbone.View.extend({
    render: function (total) {
      this.setElement($('#question-number'));
      this.$el.removeClass('hidden')
              .find('.total').text(total);
    },

    updateCurrent: function (i) {
      this.$el.find('.current').text(i);
    }
  });

  var getQuestions = function () {
    var questions = [];

    $.get('/quiz', function (xml) {
      $(xml).find('Question').each(function () {
        var correct = $(this).find('Correct').text(),
            animals = [];

        $(this).find('Animal').each(function () {
          var animal = {
            correct: correct == $(this).find('Id').text(),
            name: $(this).find('GermanName').text(),
            image: $(this).find('PictureFile').text(),
            sound: $(this).find('SoundFile').text().replace(' ', '_').replace('.', '_TSA-short.')
          };

          animals.push(new Animal(animal));
        });

        questions.push(new Question(animals));
      });
    });

    return questions;
  };


  var GAME = GAME || {};

  GAME.quiz = new Quiz({ questions: getQuestions() });

  GAME.init = function () {
    this.quiz.render();
  };

  $('#start').click(function () {
    $(this).hide();
    GAME.init();
  });
})();
