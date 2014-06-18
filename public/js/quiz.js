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
        'data/sounds/' + this.correctAnswer().get('sound')
      )
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
        animal: animal
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

  var GAME = GAME || {};

  GAME.quiz = new Quiz({ questions: [ // hardcoded
     new Question([
      new Animal({ name: 'K&uuml;stenseeschwalbe', image: 'data/images/samples/schwalb.jpg' }),
      new Animal({ name: 'Pikachu', image: 'data/images/samples/pikachu.png' }),
      new Animal({ name: 'Habicht', image: 'data/images/samples/habicht.jpg', correct: true, sound: 'Accipiter_gentilis_TSA-short.mp3' }),
      new Animal({ name: 'Wildschwein', image: 'data/images/samples/wildschwein.jpg' }),
    ]),
    new Question([
     new Animal({ name: 'Waldkauz', image: 'data/images/samples/waldkauz.jpg', correct: true, sound: 'Strix_aluco_TSA-short.mp3' }),
     new Animal({ name: 'Steinhuhn', image: 'data/images/samples/steinhuhn.jpg' }),
     new Animal({ name: 'Glumanda', image: 'data/images/samples/glumanda.png'}),
     new Animal({ name: 'Rothirsch', image: 'data/images/samples/rothirsch.jpg' }),
   ]),
  ]});

  GAME.init = function () {
    this.quiz.render();
  };

  $('#start').click(function () {
    $(this).hide();
    GAME.init();
  });
})();
