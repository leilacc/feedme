package com.orzota.mahout.recommender;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.eval.RecommenderBuilder;
import org.apache.mahout.cf.taste.eval.RecommenderEvaluator;
import org.apache.mahout.cf.taste.impl.eval.AverageAbsoluteDifferenceRecommenderEvaluator;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.recommender.svd.ALSWRFactorizer;
import org.apache.mahout.cf.taste.impl.recommender.svd.SVDRecommender;
import org.apache.mahout.cf.taste.impl.similarity.EuclideanDistanceSimilarity;
import org.apache.mahout.cf.taste.impl.similarity.LogLikelihoodSimilarity;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.impl.similarity.SpearmanCorrelationSimilarity;
import org.apache.mahout.cf.taste.impl.similarity.TanimotoCoefficientSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.apache.mahout.common.RandomUtils;

import java.io.File;

class EvaluatorIntro {

  private EvaluatorIntro() {
  }

  public static void main(String[] args) throws Exception {
    RandomUtils.useTestSeed();
    DataModel model = new FileDataModel(new File("/Users/qliu/Documents/plzfeedme/recommender/src/main/java/com/orzota/mahout/recommender/ratings.dat"));

    RecommenderEvaluator evaluator =
      new AverageAbsoluteDifferenceRecommenderEvaluator();
    // Build the same recommender for testing that we did last time:
    RecommenderBuilder recommenderBuilder = new RecommenderBuilder() {
      public Recommender buildRecommender(DataModel model) throws TasteException {
        UserSimilarity similarity = new EuclideanDistanceSimilarity(model);
        UserNeighborhood neighborhood =
          new NearestNUserNeighborhood(2, similarity, model);
        return new GenericUserBasedRecommender(model, neighborhood, similarity);
      }
    };
    // Use 70% of the data to train; test using the other 30%.
    double score = evaluator.evaluate(recommenderBuilder, null, model, 0.7, 1.0);
    System.out.println(score);
  }
}