import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Random;
import weka.classifiers.Evaluation;
import weka.classifiers.trees.J48;
import weka.core.Instances;

public class Test3
{
    public static void main(String args[])
    {
        try {
           J48 j48Classifier = new J48();
           /*
           String[] options = new String[2];
           options[0] = "-C"; 
           options[1] = "0.4";
           */
           String[] options = weka.core.Utils.splitOptions("-C 0.4");
           j48Classifier.setOptions(options);
 
           String breastCancerDataset = "../data/breast-cancer.arff";
           BufferedReader bufferedReader = new BufferedReader(new FileReader(breastCancerDataset));
           Instances datasetInstances = new Instances(bufferedReader);
           datasetInstances.setClassIndex(datasetInstances.numAttributes() - 1);

           j48Classifier.buildClassifier(datasetInstances);
           weka.core.SerializationHelper.write("./j48_breast-cancer.model", j48Classifier);

           J48 j48Classifier2 = (J48) weka.core.SerializationHelper.read("./j48_breast-cancer.model");

           Evaluation evaluation = new Evaluation(datasetInstances);
           evaluation.crossValidateModel(j48Classifier2, datasetInstances, 10, new Random(1));
           System.out.println(evaluation.toSummaryString("\nResults", false));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
