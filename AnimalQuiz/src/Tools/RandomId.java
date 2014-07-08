package Tools;

import java.util.ArrayList;

import java.util.Random;


public class RandomId {
	
	private int questionAnswers = 4;
	private int Animals = 284;
	
	public RandomId() {
		
	}
	
	public ArrayList<Integer> getRandomNum() {
		ArrayList<Integer> result =new ArrayList<Integer>(questionAnswers);
		int size = 284;

        ArrayList<Integer> list = new ArrayList<Integer>(size);
        for(int i = 1; i <= size; i++) {
            list.add(i);
        }

        Random rand = new Random();
        while(list.size() > Animals-questionAnswers) {
            int index = rand.nextInt(list.size());
            result.add(list.remove(index));
        }
		return result;
		}
	
	public int createCorrectAnswer(ArrayList<Integer> questionList){
		
		
		//int index = rand.nextInt(questionList.size());
		
		return questionList.remove(0);
		
	}
	
	
	

}
