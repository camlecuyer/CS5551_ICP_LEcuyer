package com.umkc.team11.translateapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class TranslateActivity extends AppCompatActivity {

    ArrayList<String> lang = new ArrayList<>();
    ArrayList<String> langCodes = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_translate);

        getLanguages();
        populateSpinners();

        final Button logout = findViewById(R.id.btn_logout);
        logout.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                logout();
            }
        });

        final Button translate = findViewById(R.id.btn_translate);
        translate.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                translateString();
            }
        });
    } // end onCreate

    private void translateString()
    {
        EditText startCtrl = findViewById(R.id.txt_startLang);
        String startText = startCtrl.getText().toString().trim();
        Spinner spinIn = findViewById(R.id.spn_startLang);
        Spinner spinOut = findViewById(R.id.spn_endLang);
        int inSelect = spinIn.getSelectedItemPosition();
        int outSelect = spinOut.getSelectedItemPosition();

        String inLang = langCodes.get(inSelect);
        String outLang = langCodes.get(outSelect);


        String url = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20180207T215839Z.5190d879e739b6bc.245ba2fb036efb47b67eadffd32f15796b3c69bb" +
                "&text=" + startText + "&lang=" + inLang + "-" + outLang + "&[format=plain]&[options=1]&[callback=set]";

        OkHttpClient client = new OkHttpClient();

        try
        {
            Request request = new Request.Builder().url(url).build();

            client.newCall(request).enqueue(new Callback(){
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResult;
                    final String result = response.body().string();

                    try
                    {
                        jsonResult = new JSONObject(result);
                        JSONArray convertedTextArray = jsonResult.getJSONArray("text");
                        final String convertedText = convertedTextArray.get(0).toString();
                        runOnUiThread(new Runnable(){
                            public void run(){
                               EditText resultCtrl = findViewById(R.id.txt_endLang);
                               resultCtrl.setText(convertedText);}});

                    }
                    catch(JSONException e)
                    {
                        e.printStackTrace();
                    }
                }
            });
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    } // end translateString

    private void getLanguages()
    {
        InputStream is = getResources().openRawResource(R.raw.languages);
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));

        String line = "";

        try
        {
            while((line = reader.readLine()) != null)
            {
                String[] tokens = line.split(",");

                lang.add(tokens[0]);
                langCodes.add(tokens[1]);
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    } // end getLanguages

    private void populateSpinners()
    {
        Spinner spinIn = findViewById(R.id.spn_startLang);
        Spinner spinOut = findViewById(R.id.spn_endLang);

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_spinner_item, lang);

        adapter.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line);

        spinIn.setAdapter(adapter);
        spinOut.setAdapter(adapter);
    } // end populateSpinners

    private void logout()
    {

    } // end logout
}
