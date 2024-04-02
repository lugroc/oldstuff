import java.util.Arrays;

public class App {
    //Maximun number of consecutive 1 from a binary array
    public static int findMaxConsecutiveOnes(int[] nums) {
        int counter = 0;
        int aux = 0;
        for(int i: nums){
            if(i==1){
                counter++;
            }else{
                aux = Math.max(aux,counter);
                counter = 0;
            }
        }
        return aux < counter ? counter : aux;
    }

    //find number of digits and count how many of them are even
    public static int findNumbers(int[] nums) {
        int res=0;
        for(int i: nums){
            int a=0;
            while(i>0){
                a++;
                i/=10;
            }
            if(a%2==0){
                res++;
            }
        }return res;
    }

    //order the array as ascending squares
    public static int[] sortedSquares(int[] nums) {
        int leftPointer = 0;
        int rightPointer = nums.length-1;
        int[] solution = new int[nums.length];
        for(int i = nums.length-1; i >= 0; i--){
            if(Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])){
                solution[i] = nums[leftPointer]*nums[leftPointer];
                leftPointer++;
            }
            else{
               solution[i] = nums[rightPointer]*nums[rightPointer];
                rightPointer--;
            }
        }return solution;
    }

    public static int[] sortedSquares2(int[] nums) {
        for(int i=0;i<nums.length;i++) nums[i]*=nums[i];
        Arrays.sort(nums);
        return nums;
    }

    //Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.
    public static int[] duplicateZeros(int[] arr) {
        int[] nums = new int[arr.length];
        int j=0;
        for(int i=0; i<arr.length;i++){
            if(j<arr.length){
                nums[j]=arr[i];
                if(arr[i]==0){
                    j++;
                }
                j++;
            }
        }System.arraycopy(nums,0,arr,0,nums.length);
        return arr;
    }

    public static int[] duplicateZeros2(int[] arr) {
        for(int i=0; i<arr.length;i++){
            if(arr[i]==0) {
                for(int j=arr.length-1;j>i;j--) arr[j]=arr[j-1];
                i++;
            }
        }return arr;
    }

    //You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
    public static int[] merge(int[] nums1, int m, int[] nums2, int n) { //1ms answer
        for(int i=0;i<n;i++) nums1[m+i]=nums2[i];
        Arrays.sort(nums1);
        return nums1;
    }

    public static int[] merge2(int[] nums1, int m, int[] nums2, int n) {//0ms
        int h=m-1, j=n-1;
        if(m>0 && n>0){
            for(int i=m+n-1;i>=0;i--){
                if(j<0){
                    nums2[0]=nums1[i]<=nums2[0]?nums1[i]:nums2[0];
                    j=0;
                }
                if(h<0) {
                    nums1[0]=nums1[i]<=nums2[0]?nums1[i]:nums2[0];
                    h=0;
                }
                if(nums2[j]>nums1[h]){
                    nums1[i]=nums2[j];
                    j--;
                }else{ 
                    nums1[i]=nums1[h];
                    h--;
                    if(j==0) j--;
                }
            }
        }else if(n>m) System.arraycopy(nums2,0,nums1,0,m+n);return nums1;
    }


    public static void main(String[] args) throws Exception {
        int[] nums = {2,0}, nums2 = {1,0};
        int m=1,n=1;
        System.out.println(Arrays.toString(merge2(nums,m,nums2,n)));   
    }
}

