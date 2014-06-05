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

    highlightCorrect: function () {
      this.find(function (answer) {
        return answer.get('correct');
      }).trigger('highlight');
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
      var correct = this.model.get('correct');
      if (!correct) {
        this.$el.css('background', '#f0c0ac')
      }

      Question.current.highlightCorrect();
      var answer = new AnswerView().render(correct);
    },

    highlight: function () {
      this.$el.css('background', '#c0f0ac')
    }
  });

  var AnswerView = Backbone.View.extend({
    el: '.next-question',

    render: function (correct) {
      var el = _.template($('#answer-template').html(), {
        title: correct ? "Richtig" : "Falsch"
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
      new Animal({ name: 'Pikachu1', image: 'foo.png' }),
      new Animal({ name: 'Pikachu2', image: 'foo.png' }),
      new Animal({ name: 'Pikachu3', image: 'foo.png', correct: true }),
      new Animal({ name: 'Pikachu4', image: 'foo.png' }),
    ]),
    new Question([
     new Animal({ name: 'Glumanda1', image: 'bar.png', correct: true }),
     new Animal({ name: 'Glumanda2', image: 'bar.png' }),
     new Animal({ name: 'Glumanda3', image: 'bar.png'}),
     new Animal({ name: 'Glumanda4', image: 'bar.png' }),
   ]),
  ]});

  GAME.init = function () {
    this.quiz.render();
  };

  GAME.init();
})();
