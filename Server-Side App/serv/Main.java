package serv;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;


public class Main {
    public static void main(String[] args) {
        if (args.length > 0) {
            String data = args[0];
            System.out.println(data);
        } else {
            System.out.println("No data received from server.js");
        }
    }
}
